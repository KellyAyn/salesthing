# Salesthing

The alpha release is now [live](https://salesthing.vercel.app/)!

A very small and barebones project at the moment. It is a small tool to be used
specifically by eHUB.cz affiliate network sales team. This tool helps greatly
streamline our prospecting process. Feel free to duplicate the repo and modify
it for your own sales team needs. It takes an xlsx file as input (we have a
specific format that makes it easy for me to scrape the domain names), I'm
running a relational database that holds every single domain that we have ever
processed, thus allowing me to cross reference the db with the excel file. I
filter out duplicate entries that have already been processed by other sales
reps, thus reducing the total number of domains that the rep needs to process,
since they now only see domains that have not yet been touched by any of the
other reps at the company.

A great thanks goes to my good friend [Ota](https://github.com/otatormeps) for
helping me figure all of this out. Whether it be complex data structures, or
just the good old emotional support.

## Todo

- [ ] Polish the UI and UX.
- [ ] Implement analytics
- [ ] implement settings
- [ ] implement the admin console
- [ ] allow for other inputs, be it manual or .csv files
- [ ] Remember to have fun and kiss my homies goodnight.
