# Food for All - Surplus Food Management

Food for All is a web-based platform that connects individuals and businesses with registered NGOs within a 30km radius to donate surplus food. The platform uses Next.js for the front-end and Django Rest Framework for the back-end, enabling users to register and login, and notify NGOs about available surplus food via SMS, email, and eventually WhatsApp API. Food for All aims to reduce food waste and address hunger by facilitating the collection and distribution of surplus food to those in need.

---

## Problem

Did you know that 828 million people go to bed hungry? [source](https://www.actionagainsthunger.org/the-hunger-crisis/world-hunger-facts/).We waste a lot of food for many occasions, even if it is a small wedding party in homes or in big restaurants, sometimes surplus food is made and dumped. And this many people go to bed with an empty stomach. We are solving this issue by creating a web portal.


## Why Food for All?

When this idea popped into our mind we searched all possible projects and how they built them, and found out, everything was a kind of Simple CRUD web-app or a mobile app. People won't install a separate app for this so we built a web app instead. Another thing was they built it only for Businesses or Restaurants, but still, there can be occasions where individuals need to connect with an NGO to donate. And Even if you order, I saw in some projects, they need a middle man admin to approve the restaurant or individual's request to a particular NGO, which is a tedious work, if NGO canceled the admin need to reassign to some other NGO. So we removed the middle man and the request is sent to every NGO in 30kms around the request location.

## Progress So Far

We started with a simple idea before the hackathon, while building we expanded the idea. We made authentication and a simple dashboard where NGOs can see the requests and accept them and update the status of delivering the food. Businesses and individuals can request a pickup of surplus product and they can see every detail about it, and their previous requests. We couldn't implement the OTP system now because we faced some issues in integrating them, so in theory, by just plugging in the OTP system will complete the OTP verification part. As of now, we use a hard-coded OTP and a database to do the validation.

## Health Concerns

If anyone can get in and submit a request, there might be a chance for people to give old food, we are making policies for joining NGOs to not pick up any frozen food or the food that they think is spoiled. Also, donating bad food can cause immediate police action against the individual or the business who put the request.

## Future Plans

It is a very simple version we built in less than 36 hours, and there are plenty of options to do, like integrating a WhatsApp API feature, so people get notification on their smartphones, which helps them to get the notification fast because there is a high chance for a person to look in WhatsApp messages than any emails or SMS. We plan to approach various NGOs like The Robinhood Army and making this platform more feasible for such organizations to help them in making the impact widely.

