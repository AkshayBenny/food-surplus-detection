# Food for All - Surplus Food Management

"Food for All" is a web application that aims to connect individuals and businesses with registered NGOs for the purpose of donating surplus food to those in need. The platform is designed using Next.js for the front-end and Django Rest Framework for the back-end, providing users with the ability to register and login, and subsequently add a new entry to the dashboard. Once an entry is added, nearby NGOs (within a 30-kilometer radius of the food provider) are notified via SMS, email, and eventually WhatsApp, using the WhatsApp API. The primary goal of "Food for All" is to combat food waste and address hunger by facilitating the collection and distribution of surplus food to those who require it.


---

## Problem

Were you aware that 828 million people go to bed hungry ([source](https://www.actionagainsthunger.org/the-hunger-crisis/world-hunger-facts/))?. This is a significant number, and yet we often waste a considerable amount of food in many situations, such as small weddings at home or large restaurants, resulting in surplus food being discarded. Unfortunately, this means that many people go to bed without a proper meal. To address this issue, we have created a web portal that connects NGOs with locations where there is an excess availability of food. Our aim is to reduce food waste and provide surplus food to those who need it the most.


## Why Food for All?

When we initially came up with this idea, we researched various similar projects and how they were built. We noticed that most of them were either web or mobile apps that required a significant amount of manual labor, which could have been avoided. Furthermore, people may not want to install a separate app specifically for this purpose, so we decided to create a web application instead. Additionally, many of these projects were designed solely for businesses or restaurants, but there may be instances where individuals also want to connect with an NGO to donate. We also observed that some projects required a middleman admin to approve restaurant or individual requests before forwarding them to a particular NGO. This process can be tedious, especially if the NGO cancels the request, which would require the admin to reassign it to another NGO. To eliminate this intermediary, we developed a system where requests are sent to all NGOs within a 30-kilometer radius of the requested location, thereby simplifying the process.


## Progress So Far

We began with a simple idea, which we expanded upon during the hackathon. We developed an authentication system and a dashboard for NGOs, allowing them to view and accept food donation requests, as well as update the status of the delivery process. We also created a dashboard for restaurants, where they can monitor both current and previously donated food. Businesses and individuals are able to request a pickup of surplus products and track the progress of their requests. Although we faced some challenges while integrating the OTP system, we plan to complete the OTP verification process by simply plugging it in. Currently, we use a hard-coded OTP and a database for validation.


## Health Concerns

There is a possibility that people may donate old or spoiled food if anyone can submit a request. To address this concern, we are implementing policies for joining NGOs, instructing them not to collect any frozen or potentially spoiled food. Additionally, we have implemented a simple system where each new food entry made by a restaurant or individual expires after 12 hours from the time it was cooked. Donating spoiled food can have serious consequences, and may result in immediate police action against the individual or business that made the request.


## Future Plans

We have built a simple version of the platform in less than 36 hours, but there are many more options to consider. For example, we plan to integrate a WhatsApp API feature, which will enable people to receive notifications on their smartphones. This will allow users to receive notifications quickly, as there is a high likelihood that they will check their WhatsApp messages more frequently than their emails or SMS messages. We also plan to include a payment gateway to accept donations, which will go directly to other charities. In the future, we aim to collaborate with various NGOs such as The Robinhood Army, and make the platform more feasible for such organizations, thereby enabling them to make a wider impact.

---

# Technologies
* Next.js
* Django REST framework
* Postgres
* TailwindCSS


## Min Requirements

- Node v14.6
- Python v3.10

## Frontend Setup

1. change directory to client
   ```bash
	cd client
   ```
2. npm install
   ```bash
   npm install 
   ```
   ```bash
	npm run dev
   ```

## Backend Setup

1. Install GDAL and Postgis([refer](https://docs.djangoproject.com/en/4.1/ref/contrib/gis/install/))
2. change directory to server
   ```bash
   cd server
   ```
3. create virtual environment
   ```bash
   python3 -m venv venv
	```
4. activate virtual environment
   ```bash
   source venv/bin/activate
   ```
5. install requirments
   ```bash
   pip install -r requirments.txt
   ```
6. create postgres db and setup .env inside prject directory
7. migrate models
   ```bash
	python3 manage.py migrate
	```
8. runserver
   ```bash
   python3 manage.py runserver
   ```