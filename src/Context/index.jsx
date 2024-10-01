import { createContext, useState, useEffect } from 'react'

export const ShoppingCartContext = createContext ()

export const ShoppingCartProvider = ({ children }) => {

    //Contador de productos en el carrito
    const [count, setCount] = useState(0)

    //Abrir y cerrar productDetail
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const openProductDetail = () => setIsProductDetailOpen(true)
    const closeProductDetail = () => setIsProductDetailOpen(false)

    //Pintar informacion del product en ProductDetail
    const [productToShow, setProductToShow] = useState({})

    //Agregar producto al carrito
    const [cartProducts, setCartProducts] = useState([])

    //Abrir y cerrar CheckoutSideMenu
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

    //Almacenar una orden 
    const [order, setOrder] = useState([])

    //Get products
    const [items, setItems] = useState (null)
    
    //Conexion API
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => setItems(data))
    }, [])
    

    //Para filtrar productos por title
    const [filteredItems, setFilteredItems] = useState (null)
    const[searchByTitle, setSearchByTitle] = useState(null) //Buscar por title
    
    
    //Para filtrar productos por categoria
    const[searchByCategory, setSearchByCategory] = useState(null)

    const filteredItemsByTitle = (items, searchByTitle) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }
    const filteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter(item => item.category.toLowerCase().includes(searchByCategory.toLowerCase()))
    }
    //Filtrado o por titulo o categoria
    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
        if(searchType === 'BY_TITLE') {
            return filteredItemsByTitle(items, searchByTitle)
        }
        if(searchType === 'BY_CATEGORY') {
            return filteredItemsByCategory(items, searchByCategory)
        }
        if(searchType === 'BY_TITLE_AND_CATEGORY') {
            return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
        }
        if(!searchType) {
            return items
        }
    }

    useEffect(() => {
        if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE',items, searchByTitle, searchByCategory))
        if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY',items, searchByTitle, searchByCategory))
        if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null,items, searchByTitle, searchByCategory))
        if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY',items, searchByTitle, searchByCategory))
    }, [items, searchByTitle, searchByCategory])
        
    

    console.log('searchTitle:', searchByCategory)
    
    
    

    return(
        <ShoppingCartContext.Provider value={{
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            isCheckoutSideMenuOpen,
            order,
            setOrder,
            items,
            setItems,
            searchByTitle,
            setSearchByTitle,
            filteredItems,
            searchByCategory,
            setSearchByCategory
        }}>
            { children }
        </ShoppingCartContext.Provider>
    )
}
