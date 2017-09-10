#/bin/bash
while read line; do export "$line";
done < $1