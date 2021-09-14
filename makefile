CONTAINER=mvpreal.com

SERVE_PORT?=3000

start: v1/start


v1/start: 
	docker run -it --rm --name $(CONTAINER) -v $(CURDIR):/usr/murph -p $(SERVE_PORT):3000 murphyl/nodejs npm run start

v1/update:
	docker run --rm --name $(CONTAINER) -v $(CURDIR):/usr/murph murphyl/nodejs npm update
