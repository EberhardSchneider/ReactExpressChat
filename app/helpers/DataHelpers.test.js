const dataHelper = require('./DataHelpers.js');

const testData = [{
    '_id': 'i1',
    'name': 'Eberhard',
    'profession': 'whatever'
  },
  {
    '_id': 'i2',
    'name': 'Sabine',
    'profession': 'job seekr'
  },
  {
    '_id': 'i3',
    'name': 'Klausi',
    'profession': 'adventurer'
  }
];

test('correct for empty array or undefined', () => {
  expect(dataHelper.mapFromObject([])).toEqual({});
  expect(dataHelper.mapFromObject(undefined)).toBe(undefined);

});

test('mapToObject maps correctly', () => {
  const result = dataHelper.mapFromObject(testData);
  expect(result['i1'].name).toBe(testData[0].name);
});