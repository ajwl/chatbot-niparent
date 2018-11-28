'use strict'

import {initSession, askAgent} from "./js/index.js"
import {runSample} from "./js/test.js"


const session = initSession();
askAgent("Work's fine", session.sessionClient, session.sessionPath);

runSample()

console.log("src/index file ran is this enough???")

const x = greatText();
console.log(x);