<p align="center">
  <img src="public/static/dark-logo.svg"  />
</p>

<p align="center">
 Know your meme generator. 
</p>

## Screenshots

<p float="center">
  <img src="docs/resources/templates.png" width="32%" />
  <img src="docs/resources/selected-template.png" width="32%" />
  <img src="docs/resources/generated-meme.png" width="32%" />
</p>

## Run Locally

Ensure you have [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) installed.

Clone the project:

```bash
git clone https://github.com/fariasmateuss/meme-generator.git
```

Go to the project directory:

```bash
cd meme-generator
```

Add a .env.local file, make a [imgflip](https://imgflip.com/) account and add its key following .env.example file:

```bash
mv .env.example .env.local
```

Install dependencies:

```bash
yarn
```

Start the server:

```bash
yarn dev
```

_or_

```bash
yarn next
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

To deploy this project run:

```bash
yarn build
```

## Contributing

If you liked the project and want to cooperate feel free to fork this repository and send Pull Requests.

All kinds of contributions are very welcome and appreciated.

## Contact me

Connect with me at [LinkedIn](https://www.linkedin.com/in/fariasmateuss/)

# License

Released under the [MIT License](/LICENSE)

Made with :hearts: by Mateus V. Farias
