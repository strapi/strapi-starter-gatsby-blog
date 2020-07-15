'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#cron-tasks
 */

module.exports = {
  '*/1 * * * *': async () => {

    // Fetch articles to publish
    const draftArticlesToPublish = await strapi.api.article.services.article.find({
      status: 'draft',
      publishedAt_lt: new Date(),
    });

    // Update status of articles
    draftArticlesToPublish.forEach(async article => {
      await strapi.api.article.services.article.update({ id: article.id }, { status: 'published' });
    })
  }
};
