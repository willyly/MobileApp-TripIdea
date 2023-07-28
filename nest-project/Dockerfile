FROM node:lts
WORKDIR /usr/src/app
COPY . .
EXPOSE 3000
ENV DATABASE_URL="postgresql://postgres:postgres@postgres:5432/trip_app"
CMD yarn install && \
    yarn prisma migrate reset -f &&\
    yarn start