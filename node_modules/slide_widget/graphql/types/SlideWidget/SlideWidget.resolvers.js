//export default {
module.exports = {
  Query: {
    slideWidget: async (_root, { collection, count }) => ({
      collection,
      count: count ? parseInt(count, 10) : 5
    })
  }
};
