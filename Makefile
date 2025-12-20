KUBE_NS := react-golang-chat
DEPLOYMENT_NAME := chat-server

k8s-ns:
	kubectl create namespace $(KUBE_NS) --dry-run=client -o yaml \
		| kubectl apply -f -

k8s-apply: k8s-ns
	kubectl -n $(KUBE_NS) apply -f k8s/server.yaml
	kubectl -n $(KUBE_NS) apply -f k8s/ingress.yaml
	$(MAKE) k8s-wait

k8s-deploy: k8s-apply

k8s-release:
	kubectl -n $(KUBE_NS) rollout restart deploy/$(DEPLOYMENT_NAME)
	$(MAKE) k8s-wait

k8s-wait:
	kubectl -n $(KUBE_NS) rollout status deploy/$(DEPLOYMENT_NAME) --timeout=120s

k8s-status:
	kubectl -n $(KUBE_NS) get all
	kubectl -n $(KUBE_NS) get ingress,certificate,pvc

k8s-describe:
	kubectl -n $(KUBE_NS) describe deploy/$(DEPLOYMENT_NAME)
	kubectl -n $(KUBE_NS) describe ingress/chat-server

k8s-clean:
	kubectl delete namespace $(KUBE_NS) --ignore-not-found
