import { faker } from "@faker-js/faker";

export default [...Array(5000)].map(() => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  avatar: faker.image.avatar()
}));
