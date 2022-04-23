import { View, Text, Button } from "react-native";
import { Base, Typography } from '../styles';
import { useState, useEffect } from "react";

import orderModel from "../models/orders";
import productModel from "../models/products";


export default function PickList({ route, navigation, setProducts }) {
    const { order } = route.params;
    const [productsList, setProductsList] = useState([]);

    useEffect(async () => {
        setProductsList(await productModel.getProducts());
    }, []);

    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await productModel.getProducts());
        navigation.navigate("List", { reload: true });
    }

    const productsHash = productsList.reduce((hash, current) => ({ ...hash, [current.id]: current.stock}), {});

    let allInStock = true


    const orderItemsList = order.order_items.map((item, index) => {
        if (productsHash[item.product_id] < item.amount) {
            allInStock = false;
        }

        return <Text
                key={index}
                style={{ ...Typography.normal }}
                >
                    {item.name} - {item.amount} - {item.location}
            </Text>;
    });

    return (
        <View style={{...Base.base}}>
            <Text style={{...Typography.header2}}>{order.name}</Text>
            <Text style={{...Typography.small }}>{order.address}</Text>
            <Text style={{...Typography.small }}>{order.zip} {order.city}</Text>

            <Text style={{...Typography.header3 }}>Beställda produkter:</Text>

            {orderItemsList}

            {allInStock
                ? <Button title="Plocka och packa order" onPress={pick} />
                : <Text style={{...Typography.warning }}>Packning ej möjlig, produkter saknas i lager.</Text>
            }
        </View>
    )
};
