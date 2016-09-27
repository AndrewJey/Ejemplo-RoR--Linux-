#Existen varios tipos de variables en ruby enteros , flotantes, cadenas de texto , sin embargo
#en realidad cualquier objeto , para declarar una variable de estas no es necesario declarar el tipo de varible a utilizar
class Variables
  def initialize()

  end
  def Mensaje(nombre)
    puts "Bienvenido "+nombre
  end
end

variable = Variables.new()
variable.Mensaje("Ronald")
