FROM node:12.18.3
COPY  ./src/data.csv ./src/data.csv
WORKDIR /src
CMD ["sh"]