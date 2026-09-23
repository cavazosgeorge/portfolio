#!/usr/bin/env python3
"""Portfolio's established Coolify release workflow. Never prints credentials/env."""
import json
import os
import re
import sys
from pathlib import Path
from urllib.request import Request, urlopen
APP = 'n48ssc88kgcow4s0ow4ksco8'
def request(path, method='GET', body=None):
    token = os.environ.get('COOLIFY_TOKEN') or (Path.home()/'.config/coolify/token').read_text().strip()
    root = os.environ.get('COOLIFY_URL', 'http://178.156.183.58:8000')
    req = Request(root+'/api/v1/'+path, method=method,
        headers={'Authorization': 'Bearer '+token, 'Content-Type': 'application/json'},
        data=json.dumps(body).encode() if body is not None else None)
    with urlopen(req, timeout=30) as response:
        return json.load(response)
if __name__ == '__main__':
    command = sys.argv[1] if len(sys.argv)>1 else 'status'
    if command == 'status':
        a=request('applications/'+APP)
        print(json.dumps({k:a.get(k) for k in ['uuid','status','git_branch','git_commit_sha','fqdn']}))
    elif command == 'deployment':
        d=request('deployments/'+sys.argv[2])
        print(json.dumps({k:d.get(k) for k in ['deployment_uuid','status','commit','created_at','updated_at']}))
    elif command == 'deploy':
        # Normal release continues to follow main/HEAD; no configuration mutation.
        print(json.dumps(request('deploy','POST',{'uuid':APP,'force':False})))
    elif command == 'rollback':
        sha=sys.argv[2]
        if not re.fullmatch('[0-9a-f]{40}',sha):raise SystemExit('Provide an exact reviewed commit SHA.')
        request('applications/'+APP,'PATCH',{'git_commit_sha':sha})
        print(json.dumps(request('deploy','POST',{'uuid':APP,'force':False})))
    elif command == 'track-main':
        request('applications/'+APP,'PATCH',{'git_commit_sha':'HEAD'})
        print('Tracking main/HEAD; no deployment triggered.')
    else: raise SystemExit('Usage: release.py status | deployment ID | deploy | rollback SHA | track-main')
