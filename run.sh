#!/bin/bash

docker run -v $(pwd):/app -w /app -p 3000:3000  node bash -it -c "node app $*" -rm