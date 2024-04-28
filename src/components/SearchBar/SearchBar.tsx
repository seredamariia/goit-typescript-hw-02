import { Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import css from "./SearchBar.module.css";

type Props = {
  onSubmit: (value: string) => void;
};

const SearchBar = ({ onSubmit }: Props) => {
  const handleSubmit = (
    values: FormikValues,
    actions: FormikHelpers<any>
  ): void => {
    const formattedSearch = values.search.trim().toLowerCase();
    onSubmit(formattedSearch);
    actions.resetForm();
  };

  return (
    <>
      <header className={css.header}>
        <Formik initialValues={{ search: "" }} onSubmit={handleSubmit}>
          <Form>
            <Field
              className={css.inputSearch}
              type="text"
              name="search"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
            <button type="submit">Search</button>
          </Form>
        </Formik>
      </header>
    </>
  );
};

export default SearchBar;
