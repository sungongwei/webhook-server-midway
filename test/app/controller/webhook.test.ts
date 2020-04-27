/* tslint:disable */
// const { app, assert } = require('midway-mock/bootstrap');
/* tslint:enable */
import {app ,assert}  from 'midway-mock/bootstrap'

describe('test/app/controller/webhook.test.ts', () => {

  it('should assert', async () =>{
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));
    // const ctx = app.mockContext({});
    // await ctx.service.xx();
  });

  it('should POST webhook/ ping ', () => {
    // app.mockHeaders({
    //   "user-agent":"Coding.net Hook",
    //   "x-coding-event":'ping'
    // })
      return app
      .httpRequest()
      .post('/webhook?event=kaldorei')
      .set('user-agent','Coding.net Hook')
      .expect('user-agent','Coding.net Hook')
  });
  // it('should GET webhook/ push ', () => {
  //   app.mockHeaders({
  //     "user-agent":"Coding.net Hook",
  //     "x-coding-event":'push'
  //   })
  //   app.mockContext()
  //   return app.httpRequest()
  //     .post('/webhook?evnet=kaldorei')
  //     .expect('Welcome to midwayjs!')
  //     .expect(200);
  // });
  // it('should GET webhook/ pull ', () => {
  //   app.mockHeaders({
  //     "user-agent":"Coding.net Hook",
  //     "x-coding-event":'pull'
  //   })
  //   return app.httpRequest()
  //     .post('/webhook?evnet=kaldorei')
  //     .expect('Welcome to midwayjs!')
  //     .expect(200);
  // });
});
