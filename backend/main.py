print("FUCK")
import html
import json
from fastapi import FastAPI, Query, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import traceback
import os
import json

PATHTOFILES = "/notes/"

# Init FastAPI
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5090",
    "http://localhost:5080",
    "http://*:16090",
    "http://localhost:16090",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#######
# STATIC FILES
#
#app.mount("/static", StaticFiles(directory="static"), name="static") 


#######
# JSON API
#

# GET ALL LEDGERS
# WALK DIRECTORIES
# CREATE TREE STRUCTURE

@app.get("/filenamelist/")
async def _getfilenamelist():
    dir_list = os.listdir(PATHTOFILES)
    return JSONResponse(content=dir_list, status_code=200)


# filename is dir prefix for frontend
def getledgers(filename):
    # Get Ledgers (.ledger.json) in the selected path to ledger
    path = "/ledgers/" + filename + "/"
    recursivefilepathlist = []

    for root, dirs, files in os.walk(path):
        recursivefilepathlist += list(map(lambda f: root + "/" + f, files))
     
    # filter for *.ledger.json
    ledgerfilepaths = list(filter(lambda f: \
            f.endswith(".ledger.json"), recursivefilepathlist))

    print("THE LEDGER FILENAMES")
    print(ledgerfilepaths)

    ## Create Dict
    ledgersdict = {}
    for filepath in ledgerfilepaths:
        with open(filepath) as f:
            ledgerdata = json.load(f)
            ledgersdict[filepath] = ledgerdata
    return ledgersdict

@app.get("/ledgers/{filename:path}")
async def _getledgers(filename:str):
    ledgersdict = getledgers(filename)
    print(ledgersdict)
    return JSONResponse(content=ledgersdict, status_code=200)


def addtransactiontoledger(transaction, ledger):
    targetledgerpath = "/" + ledger

    try:

        with open(targetledgerpath) as f:
            ledgerdata = json.load(f)

        # Get Highest Key in the Ledger
        print("First modifiy the json to append")
        print("Add a string key of index")
        integerkeys = list(map( lambda x: int(x),  ledgerdata.keys()))
        print(integerkeys)
        highestkey = sorted(integerkeys,reverse=True)[0]

        # New Key is + 1
        newkey = int(highestkey) + 1
        print(highestkey)
        print(newkey)

        # Write transaction at new key
        ledgerdata[str(newkey)] = transaction 

        # Save
        with open(targetledgerpath, 'w') as f:
            print("opened f")
            f.write(json.dumps(ledgerdata,    sort_keys=True, indent=4))

    except e:
        print(e)


@app.post("/add/{rest_of_path:path}")
async def _addtransactiontoledger(request: Request, rest_of_path: str):
    requestjson  = await request.json()
    print(requestjson)
    print(rest_of_path)

    addtransactiontoledger(requestjson, rest_of_path)

    myjson = json.loads("\"OK\"")
    return JSONResponse(content=myjson, status_code=200)
