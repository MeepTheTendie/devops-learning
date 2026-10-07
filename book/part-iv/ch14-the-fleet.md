# Chapter 14: The Fleet

> Part IV — The Cosmogony · DevOps skill: Kubernetes

## Goal
Run the game in a local Kubernetes cluster and watch containers be scheduled, heal, and roll.

## You learn
- Kubernetes = a scheduler plus a reconciliation loop that makes reality match what you asked.
- **Pods** are the smallest runnable unit; **deployments** describe the desired state.
- **Services** give pods a stable name and address; **probes** tell K8s the app is alive/ready.
- `kubectl` is the control remote; `kind` runs a whole cluster on one laptop.

## Key ideas (skeleton — depth filled during the session)
- Why "kill the pod and K8s restarts it" is the point, not the punchline.
- Desired state vs. actual state; the loop that closes the gap.
- Rolling updates: change the image, watch pods swap one by one, roll back one command.

## Planned drills
1. `kind create cluster`; `kubectl get nodes` to see the "machines" you got for free.
2. Declare a Deployment for the game (image from Chapter 5); `kubectl get pods`, describe, and logs.
3. Expose it with a Service, hit it with `curl`, kill a pod, and watch it come back.
4. Update the image, watch the rollout, `kubectl rollout undo` on purpose.

## Finish line
- Explain the difference between a pod and a deployment in your own words.
- Delete a running pod and prove Kubernetes brings the world back to the desired state.
- Roll back a bad image in one command.

## Resume point
Not started.