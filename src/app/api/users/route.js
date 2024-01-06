import { query } from "@/lib/db";

export async function GET(request) {
    const users = await query({
        query: "SELECT * FROM users",
        values: [],
    });

    let data = JSON.stringify(users);
    return new Response(data, {
        status: 200,
    });
}

export async function POST(request) {

    const { name, email, phone, type, role } = await request.json();
    const updateUsers = await query({
        query: "INSERT INTO users (name, email, phone, type, role) VALUES (?, ?, ?, ?, ?)",
        values: [name, email, phone, type, role],
    });
    const result = updateUsers.affectedRows;
    let message = "";
    if (result) {
        message = "success";
    } else {
        message = "error";
    }
    const users = {
        email: email,
    };
    return new Response(JSON.stringify({
        message: message,
        status: 200,
        users: users
    }));
}

export async function PUT(request) {

    const { id, email, name, phone, type, role } = await request.json();
    const updateProducts = await query({
        query: "UPDATE users SET name = ?, email = ?, phone = ?, type = ?, role = ? WHERE id = ?",
        values: [name, email, phone, type, role, id],
    });

    const result = updateProducts.affectedRows;
    let message = result ? "success" : "error";

    const product = {
        id: id,
        email: email,
    };

    return new Response(JSON.stringify({
        message: message,
        status: 200,
        product: product
    }), { headers: { 'Content-Type': 'application/json' } });

}


export async function DELETE(request) {

    const { id } = await request.json();
    const deleteUser = await query({
        query: "DELETE FROM users WHERE id = ?",
        values: [id],
    });
    const result = deleteUser.affectedRows;
    let message = "";
    if (result) {
        message = "success";
    } else {
        message = "error";
    }
    const product = {
        id: id,
    };
    return new Response(JSON.stringify({
        message: message,
        status: 200,
        product: product
    }));

}