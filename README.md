## Wish to the contribute code to Jamaica Breaches?

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Make your changes and do a pull request.

## Wish to the contribute docs to Jamaica Breaches?

Add and entry in the breaches.json file. This file is located in the `data/` directory. 

It should be in this format:

```
---
{
    name: Some Company
    year: 20xx
    type: Event (Hack etc)
    records: Number of records affected
    source: {
      "source": "Link to source.",
      "source (2)": "Link to the second source.",
      "some other source": "Link to some other source."
    }
}
---
```
Ensure each entry is added by year, in asending order. 

Then do a pull request.
