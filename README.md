# Salesthing

## Todo

- [x] DB connection via Drizzle and singlestore
- [x] Authentication with clerk
- [x] create UI
- [ ] Handle excel upload
- [ ] parse excel file
- [ ] Write excel contents into UI table
- [ ] Crossreference with DB functionality and write into UI table
- [ ] Implement operations on ??inmemory?? table with UI
- [ ] Profit


## where I left off

Try to figure out how to make the table faster, my best guess right now is to use the vercel blob storage to store the JSON blob, so the user does not have to query the db on every single reload and can just pull the data from the Blob, only issue is I would need to properly keep the blob and the DB in sync, but the user does not have to necessarily see the work behind the scenes. The data is already just json, so it should be ez.