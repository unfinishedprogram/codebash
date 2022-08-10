#!/bin/bash

cat questions/example/in.txt | node runtest.js questions/example > tmp.txt && 
node compare.js tmp.txt questions/example/out.txt;
rm tmp.txt;