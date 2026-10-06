import { Router } from 'express';
import { authRouter } from './auth.routes';
import { blogRouter } from './blog.routes';
import { projectRouter } from './project.routes';
import { storyRouter } from './story.routes';
import { lifeAtRequinRouter } from './lifeAtRequin.routes';
import { careerRouter } from './career.routes';
import { testimonialRouter } from './testimonial.routes';
import { mediaRouter } from './media.routes';
import { statsRouter } from './stats.routes';
import { publicRouter } from './public.routes';

export const apiRouter = Router();

apiRouter.use(authRouter);
apiRouter.use(blogRouter);
apiRouter.use(projectRouter);
apiRouter.use(storyRouter);
apiRouter.use(lifeAtRequinRouter);
apiRouter.use(careerRouter);
apiRouter.use(testimonialRouter);
apiRouter.use(mediaRouter);
apiRouter.use(statsRouter);
apiRouter.use(publicRouter);
