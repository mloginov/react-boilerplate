import faker from 'faker';

import { stall } from './helper';

const types = [
  'university',
  'bootcamps',
  'profTraining',
  'school',
  'enterprise',
];
const requestFixture = () => ({
  id: faker.datatype.uuid(),
  name: `${faker.address.city()} Request`,
  type: faker.random.arrayElement(types),
});

const fetchRequests = async () => {
  await stall();
  return [...new Array(15)].map(requestFixture);
};

export default {
  fetchRequests
}
