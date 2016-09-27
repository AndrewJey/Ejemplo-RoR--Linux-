$objeto= "Esto es un objeto global" #LAS VARIABLES INICIALIZADAS CON SIGNO $ SE INTERPRETAN COMO GLOBALES
class AlcanseVariables
  def initialize()

  end
  def saluda()
    puts $objeto
  end
end

alcanse = AlcanseVariables.new()
alcanse.saluda()
gets()