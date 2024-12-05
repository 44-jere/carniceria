import os
from cs50 import SQL
from flask_session import Session
from flask import Flask, flash, jsonify, redirect, render_template, request, session
app = Flask(__name__)

# Configurar clave secreta para la sesión
app.secret_key = os.getenv('SECRET_KEY', 'default_secret_key')

# Configurar sesión para usar el sistema de archivos en lugar de cookies firmadas
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///carniceria.db")
def verifyClientExist(phone,email):
    db.execute("INSERT INTO Clientes (telefono, email) VALUES (?, ?)", phone, email)
    user = db.execute("SELECT id FROM Clientes WHERE telefono = ? AND email = ?", phone, email)
    session['user_id'] = user[0]["id"]
    return user
def obtener_pedidos(user_id, entregado, cancelado):
    """
    Obtener pedidos de un usuario con detalles del producto, basado en el estado de entrega y cancelación.

    :param user_id: ID del usuario.
    :param entregado: Estado de entrega (0 o 1).
    :param cancelado: Estado de cancelación (0 o 1).
    :return: Lista de pedidos con detalles del producto.
    """
    pedidos = db.execute("""
        SELECT
            Pedidos.id AS pedido_id,
            Productos.nombre AS nombre_producto,
            Productos.precio AS precio_producto,
            Productos.descripcion AS descripcion_producto,
            Productos.link AS link_producto,
            Pedidos.cantidad AS cantidad_compra
        FROM
            Pedidos
        JOIN
            Productos ON Pedidos.producto_id = Productos.id
        WHERE
            Pedidos.cliente_id = ?
            AND Pedidos.cancelado = ?
            AND Pedidos.entregado = ?
    """, user_id, cancelado, entregado)

    return pedidos
@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "GET":
        prooductos = db.execute("SELECT * FROM Productos WHERE en_stock = 1")
        print(prooductos)
        return render_template("index.html",prooductos=prooductos)

@app.route("/details",methods=["GET"])
def details():
    if request.method == "GET":
        id = request.args.get("q")
        producto = db.execute("SELECT id, nombre, descripcion, unidad, precio, link FROM Productos WHERE id = ?",id)
        if producto == []:
            return render_template("apology.html")

        return render_template("details.html",producto = producto[0])
@app.route("/shopping",methods=["GET"])
def shopping():
    if request.method == "GET":
        user_id = session.get('user_id')
        if not user_id:
            return render_template("shopping.html")
        id = session['user_id']
        id = int(id)
        confirmedPurchases = obtener_pedidos(id, 0, 0)
        deliveredPurchases = obtener_pedidos(id, 1, 0)
        return render_template(
            "shopping.html",
            confirmedPurchases = confirmedPurchases,
            deliveredPurchases = deliveredPurchases
            )

@app.route('/process', methods=['POST'])
def process():
    if request.method == "GET":
        return

    data = request.json
    phone = data.get('phone', '')
    email = data.get('email', '')

    if phone == "":
        return '', 404
    if email == "":
        return '', 404

    purchase_list = data.get('purchaseList', [])
    if email == []:
        return '', 404

    user = db.execute("SELECT id FROM Clientes WHERE telefono = ? AND email = ? ",phone,email)
    if user == []:
        user = verifyClientExist(phone,email)
    productsIDs = db.execute("SELECT id FROM Productos WHERE en_stock = 1")
    def id_in_list(id_to_find, products_list):
        return any(item['id'] == id_to_find for item in products_list)
    user = user[0]["id"]

    def parse(number):
        try:
            return int(number)
        except (ValueError, TypeError):
            return False
    total_quantity = sum(item["quantity"] for item in purchase_list)
    if total_quantity < 2 :
        flash('Debes de comprar mas de 2 articulos')
        return
    for id, value in purchase_list.items():
        isValidPurchase = id_in_list(id, productsIDs)
        isValidQuantity = parse(value["quantity"])
        id = parse(id)
        if not id: continue
        if not isValidQuantity : continue
        if not isValidPurchase: continue

        previousActivePurchase = db.execute("SELECT id,cantidad FROM Pedidos WHERE producto_id =? AND cliente_id = ? AND entregado = 0 AND cancelado = 0",id,user)
        if(previousActivePurchase == []):
            db.execute("INSERT INTO Pedidos (producto_id, cantidad, cliente_id) VALUES (?, ?, ?)",id,isValidQuantity,user)
        else:
            previous_quantity = previousActivePurchase[0]["cantidad"]
            new_quantity = previous_quantity + isValidQuantity
            db.execute("UPDATE Pedidos SET cantidad = ? WHERE id = ?", new_quantity, previousActivePurchase[0]["id"])


    # Devolver una respuesta
    return '', 204

@app.route('/setID', methods=['POST'])
def setID():
    user_id = session.get('user_id')
    if user_id:
        return jsonify({'message': 'User ID already set in session'}), 200

    data = request.json
    phone = data.get('phone', '')
    email = data.get('email', '')

    if not phone or not email:
        return jsonify({'error': 'Phone or email is missing'}), 400

    verifyClientExist(phone, email)
    return jsonify({'message': 'User verified or created successfully'}), 200
