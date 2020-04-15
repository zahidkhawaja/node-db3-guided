const db = require("../data/db-config");

module.exports = {
    all,
    findById,
    create,
    remove,
    update
}

function all() {
    return db("users");
}

function findById(id) {
    return db("users").where("id", id).first();
}

function create(user) {
    return db("users")
    .insert(user, "id")
    .then(([id]) => {
        return findById(id);
    });
}

function remove(id) {
    return db("users").where("id", id).del();
}

function update(id, changes) {
    return db("users")
    .where("id", id).update(changes)
    .then(() => {
        return findById(id);
    })
}