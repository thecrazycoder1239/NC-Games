export default function ReviewsByCateogry() {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [categories, setCategories] = useState([])
    const [ categoryDescription, setCategoryDescription ] = useState("")


    useEffect(() => {
        getReviews().then(response => {
            setReviews(response.data.reviews)
            setIsLoading(false)
        })
    },[])

    useEffect(() => {
        getCategories().then(response => {
            setCategories(response.data.categories)
        })
    }, [])

    useEffect(() => {
        categories.map(category => {
            if(category.slug === selectedCategory) {
                setCategoryDescription(category.description)
            }
        })
    }, [selectedCategory])

    const filteredReviews = reviews.filter(review => {
        if (selectedCategory === "all") {
            return review
        }
        if (selectedCategory === review.category) {
            return review
        }
    })


}