"use strict";
require("dotenv").config();
/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/3.0.0-beta.x/concepts/configurations.html#bootstrap
 */
const fs = require("fs");
const path = require("path");
const { categories, homepages, users, articles } = require("../../seed/seed");


const findPublicRole = async () => {
  const result = await strapi
    .query("role", "users-permissions")
    .findOne({ type: "public" });
  return result;
};

const setDefaultPermissions = async () => {
  const role = await findPublicRole();
  const permissions_applications = await strapi
    .query("permission", "users-permissions")
    .find({ type: "application", role: role.id });
  const permissions_users = await strapi
    .query("permission", "users-permissions")
    .find({ type: "users-permissions", controller: "user", action: "find", role: role.id });
  await Promise.all(
    permissions_applications.map(p =>
      strapi
        .query("permission", "users-permissions")
        .update({ id: p.id }, { enabled: true })
    ),
    permissions_users.map(p =>
      strapi
        .query("permission", "users-permissions")
        .update({ id: p.id }, { enabled: true })
    )
  );
};

const isFirstRun = async () => {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: "type",
    name: "setup"
  });
  const initHasRun = await pluginStore.get({ key: "initHasRun" });
  await pluginStore.set({ key: "initHasRun", value: true });
  return !initHasRun;
};

const getFilesizeInBytes = filepath => {
  var stats = fs.statSync(filepath);
  var fileSizeInBytes = stats["size"];
  return fileSizeInBytes;
};

const createSeedData = async (files) => {

  const handleFiles = (data, model) => {
    var substring = "";

    if(model == "user") {
      substring = data.email;
    }
    else if(model == "article"){
      substring = data.slug;
    }
    else {
      substring = data.Seo.shareImage.alt
    }

    var file = files.find(x => x.includes(substring));
    file = `./seed/uploads/${file}`;

    const size = getFilesizeInBytes(file);
    const array = file.split(".");
    const ext = array[array.length - 1]
    const mimeType = `image/.${ext}`;
    const image = {
      path: file,
      name: `${substring}.${ext}`,
      size,
      type: mimeType
    };
    return image
  }


  const categoriesPromises = categories.map(({ ...rest }) => {
    return strapi.services.category.create({
      ...rest
    });
  });

  const homepagePromises = homepages.map(async homepage => {
    const image = handleFiles(homepage, "homepage")
    const files = {
      "Seo.shareImage.image": image
    };

    try {
      const entry = await strapi.query("homepage").create(homepage);

      if (files) {
        await strapi.entityService.uploadFiles(entry, files, {
          model: "homepage"
        });
      }
    } catch (e) {
      console.log(e);
    }

  });

  const usersPromises = users.map(async user => {
    const image = handleFiles(user, "user")
    const files = {
      image
    };

    try {
      const entry = await strapi.query("user", "users-permissions").create(user);

      if (files) {
        await strapi.entityService.uploadFiles(entry, files, {
          model: "plugins::users-permissions.user"
        });
      }
    } catch (e) {
      console.log(e);
    }

  });

  const articlesPromises = articles.map(async article => {
    const image = handleFiles(article, "article")
    const files = {
      image,
      "Seo.shareImage.image": image
    };

    try {
      const entry = await strapi.query('article').create(article);

      if (files) {
        await strapi.entityService.uploadFiles(entry, files, {
          model: 'article'
        });
      }
    } catch (e) {
      console.log(e);
    }

  });

  await Promise.all(categoriesPromises);
  await Promise.all(homepagePromises);
  await Promise.all(usersPromises);
  await Promise.all(articlesPromises);
};

module.exports = async () => {
    const shouldSetDefaultPermissions = await isFirstRun();
    if (shouldSetDefaultPermissions) {
      try {
        console.log("Setting up your starter...");
        const files = fs.readdirSync(`./seed/uploads`);
        await setDefaultPermissions();
        await createSeedData(files);
        console.log("Ready to go");
      } catch (e) {
        console.log(e);
      }

    }
};
