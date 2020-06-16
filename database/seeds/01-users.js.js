    exports.seed = async function (knex) {

    await knex('users').insert([
        {
            username: "test1",
            password: "$2a$14$6q8.9uwdRKrjLoV8xyCNvuOjSEevaB4EicZuH2sUxuiP7csifKcVS"
              
        },
    ]);
};