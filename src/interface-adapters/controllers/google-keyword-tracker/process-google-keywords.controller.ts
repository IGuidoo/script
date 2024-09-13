import { getInjection } from "../../../di/container";
import { db } from "../../../infrastructure/db";


async function processGoogleKeywordsController() {
  const usersRepository = getInjection("IUsersRepository");
  
  const user = await usersRepository.getById('cm0tpkvvy0000qn064e5btdf5');
  console.log('user', user);
  // // Example query
  // const allUsers = await db.location.findMany();
  // console.log(allUsers);
}

processGoogleKeywordsController()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    console.log('Disconnecting from database');
    await db.$disconnect();
  });