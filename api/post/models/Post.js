'use strict';

/**
 * Lifecycle callbacks for the `Post` model.
 */

const sets = [
  {to: 'a', from: '[ÀÁÂÃÄÅÆĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶἀ]'},
  {to: 'c', from: '[ÇĆĈČ]'},
  {to: 'd', from: '[ÐĎĐÞ]'},
  {to: 'e', from: '[ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆ]'},
  {to: 'g', from: '[ĜĞĢǴ]'},
  {to: 'h', from: '[ĤḦ]'},
  {to: 'i', from: '[ÌÍÎÏĨĪĮİỈỊ]'},
  {to: 'j', from: '[Ĵ]'},
  {to: 'ij', from: '[Ĳ]'},
  {to: 'k', from: '[Ķ]'},
  {to: 'l', from: '[ĹĻĽŁ]'},
  {to: 'm', from: '[Ḿ]'},
  {to: 'n', from: '[ÑŃŅŇ]'},
  {to: 'o', from: '[ÒÓÔÕÖØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠ]'},
  {to: 'oe', from: '[Œ]'},
  {to: 'p', from: '[ṕ]'},
  {to: 'r', from: '[ŔŖŘ]'},
  {to: 's', from: '[ßŚŜŞŠȘ]'},
  {to: 't', from: '[ŢŤ]'},
  {to: 'u', from: '[ÙÚÛÜŨŪŬŮŰŲỤỦỨỪỬỮỰƯ]'},
  {to: 'w', from: '[ẂŴẀẄ]'},
  {to: 'x', from: '[ẍ]'},
  {to: 'y', from: '[ÝŶŸỲỴỶỸ]'},
  {to: 'z', from: '[ŹŻŽ]'},
  {to: '-', from: '[·/_,:;\']'}
];

const getSlug = title => {
  sets.forEach(set => {
    title = title.replace(new RegExp(set.from,'gi'), set.to)
  });

  return title
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/—/g, "-") // Replace long dash with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, "") // Trim - from end of text
}

module.exports = {
  // Before saving a value.
  // Fired before an `insert` or `update` query.
  // beforeSave: async (model) => {},

  // After saving a value.
  // Fired after an `insert` or `update` query.
  // afterSave: async (model, result) => {},

  // Before fetching all values.
  // Fired before a `fetchAll` operation.
  // beforeFetchAll: async (model) => {},

  // After fetching all values.
  // Fired after a `fetchAll` operation.
  // afterFetchAll: async (model, results) => {},

  // Fired before a `fetch` operation.
  // beforeFetch: async (model) => {},

  // After fetching a value.
  // Fired after a `fetch` operation.
  // afterFetch: async (model, result) => {},

  // Before creating a value.
  // Fired before an `insert` query.
  beforeCreate: async model => {
    if (!model.slug) {
      const slug = getSlug(model.title)
      model.set("slug", slug)
    }
  },

  // After creating a value.
  // Fired after an `insert` query.
  // afterCreate: async (model, result) => {},

  // Before updating a value.
  // Fired before an `update` query.
  beforeUpdate: async model => {
    if (model.getUpdate().slug === "") {
      const slug = getSlug(model.getUpdate().title)
      model.update({ slug })
    }
  },

  // After updating a value.
  // Fired after an `update` query.
  // afterUpdate: async (model, result) => {},

  // Before destroying a value.
  // Fired before a `delete` query.
  // beforeDestroy: async (model) => {},

  // After destroying a value.
  // Fired after a `delete` query.
  // afterDestroy: async (model, result) => {}
};
