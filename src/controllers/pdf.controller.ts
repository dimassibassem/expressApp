import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';
import { getUrlExtension, isValidUrl } from '@utils/util';
class PdfController {
  public index = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const { url } = req.body;
      if (isValidUrl(url)) {
        const extension = getUrlExtension(url);
        if (extension === 'pdf') {
          const response = await axios.get(url, {
            responseType: 'arraybuffer',
          });
          const base64 = Buffer.from(response.data, 'binary').toString('base64');
          const fileName = `${Date.now()}.pdf`;
          fs.writeFile(fileName, base64, 'base64', function (err) {
            console.log(err);
          });
          const pdf = new FormData();
          pdf.append('pdf', fs.createReadStream(fileName));
          const headers = pdf.getHeaders();
          const html = await axios.post('http://0.0.0.0:4000/pdfupload', pdf, {
            headers: {
              ...headers,
              'Content-Type': 'multipart/form-data',
            },
          });
          fs.unlink(fileName, function (err) {
            if (err) throw err;
            console.log('File deleted!');
          });
          return res.send(html.data);
        } else {
          return res.send('Please provide a valid pdf url');
        }
      } else {
        return res.send('URL is not valid');
      }
    } catch (error) {
      next(error);
    }
  };
}

export default PdfController;
