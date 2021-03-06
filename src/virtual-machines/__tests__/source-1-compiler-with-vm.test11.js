/**
 * Testing complex function 3.
 * GCD Function adapted from SICP Source D example.
 */

function get_compiled() {
    // Enter code to be compiled here:
	const user_input = "													\
	const precision = 0.000001;												\
																			\
	function f(x) {															\
	    return x*x*2 + 5*x - 1;												\
	} 																		\
																			\
	function derivative(f) {												\
	    const h = 0.001;													\
	    return (x) => { return (f(x + h) - f(x - h)) / (2 * h); };			\
	}																		\
																			\
	function newtonsMethod(guess, prevGuess) {								\
	    const myguess= guess === 0? 0:guess;								\
																			\
	    if (math_abs(prevGuess - myguess) > precision) {					\
	        const new_prevGuess = myguess;									\
	        const approx = myguess - (f(myguess) / derivative(f)(myguess));	\
																			\
	        return newtonsMethod(approx,new_prevGuess);						\
	    } else {															\
	        return myguess;													\
	    }																	\
	}																		\
	newtonsMethod(1, 0);													\
	";
	
    const compiled_code = parse_and_compile(user_input);
    // pretty_print_instructions(compiled_code);
    return compiled_code;
}      

function source_machine() {
    const ops = list(
        list("make_top_environment",make_top_environment_procedure),
        list("extend_environment",extend_environment_procedure),
        list("extend_environment_block",extend_environment_block_procedure),
        list("define_constant",define_constant_procedure),
        list("lookup_variable_value",lookup_variable_value_procedure),
        list("list",list_procedure),
        list("cons",cons_procedure),
        list("is_false",is_false_procedure),
        list("make_compiled_procedure",make_compiled_procedure_procedure),
        list("compiled_procedure_env",compiled_procedure_env_procedure),
        list("compiled_procedure_entry",compiled_procedure_entry_procedure),
        list("is_primitive_procedure",is_primitive_procedure_procedure),
        list("compiled_procedure_entry",compiled_procedure_entry_procedure),
        list("compiled_procedure_entry",compiled_procedure_entry_procedure),
        list("apply_primitive_procedure",apply_primitive_procedure_procedure)
    );
    const  x = statements(get_compiled());
    const machine = make_machine(all_regs(),ops,x);
    machine("stack")("initialize");
    set_register_contents(machine, "env",make_default_top_environment_procedure(list()));

	return machine;
}  

const ad = source_machine();
start(ad);
// display(start(ad));
// display(get_register_contents(ad, "val"));
get_register_contents(ad, "val");
// 0.18614066163450715
