import App from '@/app';

import PdfRoute from '@routes/uploadpdf.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new PdfRoute()]);

app.listen();
