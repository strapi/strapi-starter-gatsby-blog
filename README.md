# Strapi Starter Gatsby Blog v2

Gatsby starter for creating an great blog with Strapi.

This starter allows you to try Strapi with Gatsby with the example of a simple blog. It is fully customizable and due to the fact that it is open source, fully open to contributions. Do not hesitate to add new features etc ...

![screenshot image](/screenshot.png)

### Deploy the backend

To deploy the Strapi instance you'll need:

- [An Heroku account](https://signup.heroku.com/) for free
- [A Cloudinary account for saving images](https://cloudinary.com/users/register/free) for free

Once you have created these accounts you can deploy your instance by clicking on this button

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/strapi/strapi-starter-gatsby-blog-v2)

### Deploy the frontend

**On Vercel**

To deploy the Gatsby blog you'll need:

  - [A Vercel account](https://vercel.com/dashboard) for free
  - Wait for your heroku instance to be up and running before deploying your Gatsby Blog
  - Vercel will ask you the root directory of the project to deploy which is **frontend**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git?s=https%3A%2F%2Fgithub.com%2Fstrapi%2Fstrapi-starter-gatsby-blog-v2&env=API_URL&envDescription=Enter%20the%20url%20of%20your%20Strapi%20API%20without%20the%20trailing%20slash&project-name=my-strapi-starter-gatsby-blog)

**On Gatsby Cloud**

You may want to deploy this starter frontend on [Gatsby Cloud](https://www.gatsbyjs.com/dashboard) in order to try the Gatsby Preview maybe!

- Fork this starter on your own Github account
- Create a new site by choosing the option "I already have a Gatsby site"

![Create a New site](/medias/create-a-new-site.png)

You'll be asked to select the repository you want to use

- Select your new Strapi Starter Gatsby Blog repository you just forked and specify the Gatsby project folder which is `frontend` in this starter

![Repository](/medias/repository.png)

- You can then copy the webhook url and skip this step

![Skip step](/medias/skip.png)

- Paste your Strapi `API_URL` for both of your `Builds Environment variables` and `Preview Environment variables` (we consider that you deployed your strapi server)

![Env](/medias/env.png)

Now you'll need to create a Webhook on your strapi server in order to tell Gatsby cloud to build your Gatsby project each time your create/update/delete content

- Open your Strapi admin panel and go to `/admin/settings/webhooks`
- Create a new Webhook with following properties:
  - Name: `Gatsby Cloud`
  - Url: The first Webhook Url Gatsby Cloud provide in your Gatsby Dashboard Sites. It should be something like this: `https://webhook.gatsbyjs.com/hooks/data_source/` without the `/publish/`
  - Check every Events for `Entry` and `Media`

That's it! Now Strapi will inform Gatsby Cloud to build your Gatsby project everytime you create/update/delete content

### Features in Strapi

- 1 Single type
- 4 Components
- 3 Collection types: Article, Category, User
- 6 Created articles
- 5 Created categories
- Permissions set to `true` for article, category and user
- Responsive design using UIkit
- Slug system
- Publication system (draft & published)
- Role based access control

### Features in Gatsby

- gatsby-image
- Seo friendly

### Getting started

Clone the repository

```
git clone https://github.com/strapi/strapi-starter-gatsby-blog-v2.git
cd strapi-starter-gatsby-blog-v2
```

**Backend**

Install dependencies and run your server

```bash
# Using yarn
yarn install
yarn develop

# Using npm
npm install
npm run develop
```

**Frontend**

```bash
# Using yarn
yarn install
yarn develop

# Using npm
npm install
npm run develop
```

Gatsby server is running here => [http://localhost:8000](http://localhost:8000)

Enjoy this starter
