
import { getInjection } from "../../../di/container";
import { db } from "../../../infrastructure/db";

import { processNewGoogleKeywordUseCase } from "../../../application/use-cases/process-keywords/process-new-google-keywords.use-case";
import { splitAndTrimKeywords } from "../../../utils/string.utils";
import { InputParseError } from "../../../entities/errors/common";

const USER = {
  id: 'cm10yfeyl0002mm14hb2f5190',
  name: 'test',
  email: 'test@user1.nl',
  emailVerified: new Date('2024-09-08T15:09:06.848Z'),
  image: null,
  password: '$2a$10$pp2ugNXWIA0P0vlwyL7z8uryWuR9F1CPYbQhH.jff2iHiGc8Hcq1O',
  role: 'ADMIN',
  loginProvider: 'credentials',
  createdAt: new Date('2024-09-08T15:08:14.063Z'),
  updatedAt: new Date('2024-09-12T21:09:40.414Z')
};

async function processNewGoogleKeywordsController(keywordsSting: string) {
  // TODO: needs to go to authenticationService
  const usersRepository = getInjection('IUsersRepository');
  const user = await usersRepository.getById(USER.id);

  if (!user) {
    throw new Error('User not found');
  }

  const googleKeywordTrackerId = 'cm10ys4200000q48b5bvyzw2a';


  // Split and trim keywords
  const stingsArray = splitAndTrimKeywords(keywordsSting);
  console.log('stingsArray', stingsArray);
  

  // Format keywords to lower case 
  const keywords = stingsArray.map(keyword => keyword.toLowerCase());
  

  // Check if keywords are not empty
  if (keywords.length === 0) {
    throw new InputParseError('Keywords array is empty');
  }


  const result = await processNewGoogleKeywordUseCase(googleKeywordTrackerId, keywords, user);    
}



// const keywords = [
//   'Eureka mignon',
//   'Eureka mignon specialita',
//   'Rocket appartamento',
// ];

processNewGoogleKeywordsController('Eureka mignon\nEureka mignon specialita\n\nRocket appartamento')
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    console.log('Disconnecting from database');
    await db.$disconnect();
  });