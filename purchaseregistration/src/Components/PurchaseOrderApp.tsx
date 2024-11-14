import React, {useState, useEffect} from "react";
import axios from "axios";

type ProductDetail = {
    serialNumber: string;
    productName: string;
    quantity: number;
    features: string;
    price: number;
};

type PurchaseOrder = {
    orderId: number;
    clientName: string;
    products: ProductDetail[];
};

const PurchaseOrderApp: React.FC = () => {
    const [orders, setOrders] = useState<PurchaseOrder[]>([]);
    const [clientName, setClientName] = useState('');
    const [productDetail, setProductDetail] = useState<ProductDetail>({
        serialNumber: '',
        productName: '',
        quantity: 1,
        features: '',
        price: 0,
    });

// carga las ordener desde el servidor
useEffect(() => {
    const fetchOrders = async () => {
        const response = await axios.get('http://localhost:5000/api/orders');
        setOrders(response.data);
    };
    fetchOrders();
},[]);

// Guarda una nueva ordern en el servidor
const saveOrderToServer = async (newOrder: PurchaseOrder) => {
    await axios.post('http://localhost:5000/api/orders', newOrder);
};

const addOrder = () => {
    const newOrder: PurchaseOrder = {
        orderId: Date.now(),
        clientName: clientName,
        products: [],
    };
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    saveOrderToServer(newOrder);
    setClientName('');
};

const addProductToLastOrder = () => {
    // Verifica si hay al menos una orden en la lista
    if (orders.length === 0) {
        alert("Por favor, crea una orden antes de agregar un producto.");
        return;
    }

    // Si hay órdenes, agrega el producto a la última
    const updatedOrders = [...orders];
    const lastOrder = updatedOrders[updatedOrders.length - 1];
    
    // Asegúrate de que lastOrder tiene la propiedad 'products' antes de agregar
    if (lastOrder) {
        lastOrder.products.push(productDetail);
        setOrders(updatedOrders);
        saveOrderToServer(lastOrder);
        setProductDetail({
            serialNumber: '',
            productName: '',
            quantity: 1,
            features: '',
            price: 0,
        });
    }
};


return(
    <div>
        <h1>Administracion de Ordenes de Compra</h1>

        <div>
            <h2>Crear Nueva Orden</h2>
            <input
                type="text"
                placeholder="Nombre del cliente"
                value={clientName}
                onChange={e => setClientName(e.target.value)}
            />
            <button onClick={addOrder}>Crear Orden</button>
        </div>

        <div>
                <h2>Agregar Producto a la Última Orden</h2>
                <input
                    type="text"
                    placeholder="Número de Serie"
                    value={productDetail.serialNumber}
                    onChange={(e) =>
                        setProductDetail({ ...productDetail, serialNumber: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Nombre del Producto"
                    value={productDetail.productName}
                    onChange={(e) =>
                        setProductDetail({ ...productDetail, productName: e.target.value })
                    }
                />
                <input
                    type="number"
                    placeholder="Cantidad"
                    value={productDetail.quantity}
                    onChange={(e) =>
                        setProductDetail({ ...productDetail, quantity: parseInt(e.target.value) })
                    }
                />
                <input
                    type="text"
                    placeholder="Características"
                    value={productDetail.features}
                    onChange={(e) =>
                        setProductDetail({ ...productDetail, features: e.target.value })
                    }
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={productDetail.price}
                    onChange={(e) =>
                        setProductDetail({ ...productDetail, price: parseFloat(e.target.value) })
                    }
                />
                <button onClick={addProductToLastOrder}>Agregar Producto</button>
            </div>

            <div>
                <h2>Órdenes de Compra</h2>
                {orders.map((order) => (
                    <div key={order.orderId}>
                        <h3>Cliente: {order.clientName}</h3>
                        {order.products.map((product, index) => (
                            <div key={index}>
                                <p>Número de Serie: {product.serialNumber}</p>
                                <p>Nombre: {product.productName}</p>
                                <p>Cantidad: {product.quantity}</p>
                                <p>Características: {product.features}</p>
                                <p>Precio: {product.price}</p>
                            </div>
                        ))}
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PurchaseOrderApp;    