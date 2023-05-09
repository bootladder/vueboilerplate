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
    "http://localhost:16000",
    "http://localhost:16001",
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
def getnotes(filename):
    # Get Ledgers (.ledger.json) in the selected path to ledger
    path = PATHTOFILES
    recursivefilepathlist = []
    print(path) 

    for root, dirs, files in os.walk(path):
        recursivefilepathlist += list(map(lambda f: root + "/" + f, files))
    print(recursivefilepathlist) 
    # filter for *.ledger.json
    filepaths = list(filter(lambda f: \
            f.endswith(".json"), recursivefilepathlist))

    print("THE FILENAMES")
    print(filepaths)

    ## Create Dict
    ledgersdict = {}
    for filepath in filepaths:
        with open(filepath) as f:
            ledgerdata = json.load(f)
            ledgersdict[filepath] = ledgerdata
    return ledgersdict

@app.get("/notes/{filename:path}")
async def _getnotes(filename:str):
    datadict = getnotes(filename)
    print(datadict)
    return JSONResponse(content=datadict, status_code=200)


def addnote(transaction, notesfilename):
    targetfilepath = PATHTOFILES + "/" + notesfilename
    print(targetfilepath)

    try:

        with open(targetfilepath) as f:
            ledgerdata = json.load(f)

        # Write transaction at new key
        ledgerdata.append(transaction )

        # Save
        with open(targetfilepath, 'w') as f:
            print("opened f")
            f.write(json.dumps(ledgerdata,    sort_keys=True, indent=4))

    except:
        print("FAIL?")


@app.post("/add")
async def _note(request: Request):
    requestjson  = await request.json()
    print(requestjson)

    addnote(requestjson, "notes.json" )

    myjson = json.loads("\"OK\"")
    return JSONResponse(content=myjson, status_code=200)
