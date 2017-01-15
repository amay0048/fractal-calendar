export function toCamelCase(s:string) {
    let elements = s.split('-')

    return elements.reduce((prev, curr, index)=>{
        if (index === 0) return curr
        return prev + curr.charAt(0).toUpperCase() + curr.slice(1).toLowerCase()
    }, '')
}