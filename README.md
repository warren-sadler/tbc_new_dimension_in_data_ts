# The New Dimension of Data

![Promotional Image](./images/promo.gif)

This is the companion repository for the talk presented on May 11th in partnership with The Black Codes.

## System Requirements

- [NodeJS version ~> 18.16](https://nodejs.org/en)

It is recommended you use NVM to manage your node versioning. You can find a comprehensive tutorial on setting up NVM for either Windows, Linux, or Mac [here](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/).

- [Yarn \*not required](https://yarnpkg.com/getting-started/install)

## Getting Started

1. Install Project Dependencies

   ```shell
   yarn
   ```

   or if you prefer to use npm

   ```shell
   npm i
   ```

2. Set up your OpenAI Account and get a secret key

   You will also need access to the OpenAI api. To do so you will need to visit platform.openai.com to create an account.

   After you have access to the OpenAI Platform, generate an API Key from the `View API keys` page. You can access this page by clicking your avatar in the top-right navigation.

   You will then need to add the generated API Key to a .env file in the root of this directory. Copy the .env.example remove `.example` and you'll be all set.

3. Run an example

   ```shell
       node -r ts-node/register ./src/{NAME_OF_EXAMPLE}.ts
   ```
