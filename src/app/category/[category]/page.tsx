import AllFoods from '../../../components/AllFoods';

export default function CategoryPage({ params }: { params: { category: string } }) {
  return <AllFoods initialCategory={params.category} />;
}
