# Test script

You can run this script with the following command

```
npm i
node index.js csv/test.csv [searchColumnIdx] [searchTerm]
```

or in a Docker container

```
docker build -t node-csv-search .

docker run --rm --name node-csv-search -v csv:/usr/src/app/csv node-csv-search:latest csv/test.csv [searchColumnIdx] [searchTerm]
```