use wasm_bindgen::prelude::*;


#[wasm_bindgen]
pub fn add(a: u16, b: u16) -> u16 {
    // alert(&format!("Hello, {}!", name));
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 5);
        assert_eq!(result, 7);
    }
}