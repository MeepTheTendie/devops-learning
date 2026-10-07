# Down the Rabbit Hole: Scheduling at scale

> Deepens Chapter 14 · The Fleet

## Goal
See Kubernetes for what it is: a **scheduler plus a reconciliation loop** standing on the
Linux foundations from this whole branch.

## One layer deeper
- A cluster is many ordinary Linux boxes with a control plane telling each what to run.
  Executing a pod is a burst of the mechanics you've already seen: a runc/containerd launch,
  namespaces for isolation, cgroups for budgets, a network bridge for routing.
- The **scheduler** answers "where." The **reconciliation loop** is a watcher that keeps
  *actual* state (3 pods) matching *desired* state (also 3) forever — it's the difference
  between "I started it" and "I own it."
- **Probes** are kubernetes-side health checks; restarting a failed probe is the same idea
  as `systemctl restart` at fleet scale.
- K8s is the least "magic" once you've done cgroups, unions, sockets, and system services —
  every chunk on this branch is a brick in the cluster.

## Drill
```
kind create cluster
kubectl get nodes                        # machines (virtual) the scheduler sees
kubectl run probe --image=nginx:alpine   # ask for one pod
kubectl get pods -w                      # watch the loop reconcile it into Running
kubectl delete pod probe                 # kill it: no deployment = no resurrection
kubectl get events --sort-by=.lastTimestamp   # the loop's own diary
kind delete cluster
```

## Rabbit-hole finish line
- Distinguish "where does it run" (scheduler) from "what state must I maintain" (loop).
- Predict what happens when you delete a pod that a Deployment owns, and verify it live.
- Name the Linux mechanisms (this branch's topics) that make a pod a safe tenant on a shared
  kernel.

## Resume point
Not started.