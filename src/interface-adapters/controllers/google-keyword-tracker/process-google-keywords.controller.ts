
import { getInjection } from "../../../di/container";
import { db } from "../../../infrastructure/db";

import { ProcessGoogleKeywordsUseCase } from "../../../application/use-cases/process-google-keywords.use-case";
import { processNewGoogleKeywordUseCase } from "../../../application/use-cases/process-keywords/process-new-google-keywords.use-case";

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

async function processGoogleKeywordsController() {
  const usersRepository = getInjection('IUsersRepository');
  const user = await usersRepository.getById(USER.id);

  if (!user) {
    throw new Error('User not found');
  }

  const googleKeywordTrackerId = 'cm10ys4200000q48b5bvyzw2a';
  const keywords = [
    'Eureka mignon',
    'Eureka mignon specialita',
    'Rocket appartamento',
  ];


  // TODO: Format keywords to lower case 
  

  // TODO: Check if keywords are not empty

  const serperApi = getInjection('ISerperApi');
  const googleKeywordTrackerRepository = getInjection('IGoogleKeywordTrackerRepository');
  const WebsiteRepository = getInjection('IWebsiteRepository');
  try {
    const result = await processNewGoogleKeywordUseCase(googleKeywordTrackerId, keywords, user);

  } catch (error) {
    throw error;
    
  }
}

processGoogleKeywordsController()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    console.log('Disconnecting from database');
    await db.$disconnect();
  });