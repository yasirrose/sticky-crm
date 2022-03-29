# OfferBrain (Sticky CRM)

## Laravel setup 8

* Run `composer install`
* Run `npm i`
* Run `npm run dev`
* In env file set APP_URL DB
* Run `php artisan migrate:fresh --seed`

## Angular setup 10
Now for angular setup navigate to
* `cd resources/frontend/angular`
* In `resources/frontend/angular/src/environment.ts` and `resources/frontend/angular/src/environment.prod.ts` set endpoint 
* Run `npm i`
* Run `npm run start` to run application in developement mode and visit http://localhost:4200/
* Run `npm run build:prod` ton run application in development mode and visit http://your-endpoint-here/
