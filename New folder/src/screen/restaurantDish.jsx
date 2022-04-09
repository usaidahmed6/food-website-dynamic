import react, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { getDoc, db, doc } from './firebase'
import { Spin, Image, Card } from 'antd';


const RestaurantDish = () => {
    const params = useParams()
    console.log(params)
    const [loading, setLoading] = useState(true)
    const [dish, setDish] = useState(null)

    useEffect(() => {
        getdish()
    }, [])

    const getdish = async () => {
        setLoading(true)
        const ref = doc(db, 'AddDishes', params.id)
        const dish = await getDoc(ref)
        console.log('dish.exists=>', dish.exists())
        if (dish.exists()) {
            setDish(dish.data())
        }
        setLoading(false)

    }


    return (
        <div className="main container">
            {
                loading ?
                    <div style={{
                        marginTop: 120
                    }}> <Spin size='large' className='spin' /></div>
                    :
                    <h1 className="text-center">Dish Detail</h1>
            }
            {
                dish !== null ?
                    <div className='orderMain'>
                            <h4>{dish.collectionName}</h4>
                        <div className="dynamicImg">
                            <Image width={400} src={dish.collectionImage} />
                            <h4>{dish.description}</h4>
                            <h4> ${dish.price}</h4>
                        </div>
                        {/* <div className="desc"> */}
                       
                        <div className="cardOeder">
                            <Card title="Card title">


                            </Card>
                        </div>


                    </div>



                    : !loading ?
                        <h1>No Dish found</h1> : null
            }


        </div>
    )
}

export default RestaurantDish