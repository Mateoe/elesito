const hbs = require('hbs');

hbs.registerHelper('listarUsuarios', (usuarios) => {
	let texto = '';
	usuarios.forEach((usr) => {
		texto += `<tr role="row" class="odd">
			 <td class="sorting_1">${usr.firstname}</td>
			 <td>${usr.lastname}</td>
			 <td>${usr.cc}</td>
			 <td class="cell100 column4">   
			   <div class="inblock" >
				 <i id="edit" data-id="${usr.cc}" class="fa fa-pencil" ></i>
				 <i id="delete" data-id="${usr.cc}" class="fa fa-trash"></i>
				 <input type="checkbox" data-id="${usr.cc}" class="check"/> 
			   </div>
			 </td>
            </tr>`;
	});
	return texto;
});


hbs.registerHelper('listarProductos', (productos) => {
	let texto = '';
	productos.forEach((producto) => {
		texto += `<tr role="row" class="odd">
			 <td class="sorting_1">${producto.name}</td>
			 <td>${producto.cantidad}</td>
			 <td>${producto.sede}</td>
            </tr>`;
	});
	return texto;
});


hbs.registerHelper('disponibleCourses', (listado) => {
	let texto = ' ';
	let count = 1;
	listado.forEach((curso) => {
		console.log(curso.nombre);
		texto += `<div id='accordion'>
				 <div class="card mb-2">
				     <div class="card-header" id="heading${count}">
				       <h5 class="mb-0">
				         <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${count}" aria-expanded="false" aria-controls="collapse${count}">
				          CURSO: ${curso.name} VALOR: ${curso.value} DESCRIPCION: ${curso.description}
				         </button>
				       </h5>
				     </div>
				     <div id="collapse${count}" class="collapse " aria-labelledby="heading${count}" data-parent="#accordion">
				       <div class="card-body">
				         <p>Descripción: ${curso.description}</p>
								 <p>MODALIDAD: ${curso.modality}</p>
								 <p>INTENSIDAD HORARIA: ${curso.intensity}</p>
				       </div>
				     </div>
				  </div>
					</div>`;
		console.log(count);
		count += 1;
	});
	console.log(texto);
	return texto;
});

// Incribir cursos con mongodb y listarlos mongo

hbs.registerHelper('inscription', (listado) => {
	let texto = `	<form action="/dashboarduser" method="post">
			<table class='table table-striped table-hover'>
					<thead class='thead-dark'>
					<th>Nombre</th>
					<th>Valor</th>
					<th>Intensidad</th>
					<th>Modalidad</th>
					<th></th>
					<th></th>
					</thead>
					<tbody>`;
	listado.forEach((materia) => {
		texto +=
					`<tr>
					<td> ${materia.name} </td>
					<td> ${materia.value} </td>
					<td> ${materia.intensity}</td>
					<td> ${materia.modality} </td>
					<td><button class="btn btn-primary" name="ver" id="informacion">Ver</button></td>
					<td><button class="btn btn-primary" name="inscribir" value="${materia.name}">Inscribir</button></td>
					</tr> `;
	});
	texto += '</tbody> </table></form>';
	return texto;
});

// Cerrar cursos y listarlos mongo

hbs.registerHelper('closeCourse', (courses) => {
	let texto = `	<form action="/dashboardadmin" method="post">
			<table class='table table-striped table-hover'>
					<thead class='thead-dark'>
					<th>Nombre</th>
					<th>Valor</th>
					<th>Intensidad</th>
					<th>Modalidad</th>
					<th>Estado</th>
					<th></th>
					<th></th>
					</thead>
					<tbody>`;
	courses.forEach((course) => {
		// switch
		let switchVal = 'cerrar';
		if (course.state === 'Cerrado') {
			switchVal = 'abrir';
		}
		console.log(course.students);
		const myJSON = JSON.stringify(course.students);

		texto +=
					`<tr>
					<td> ${course.name} </td>
					<td> ${course.value} </td>
					<td> ${course.intensity}</td>
					<td> ${course.modality} </td>
					<td> ${course.state}</td>
					<td>
						<p>
						  <button class="btn btn-primary" type="submit" data-toggle="collapse" data-target="#collapseExample${course.name}" aria-expanded="false" aria-controls="collapseExample${course.name}" name="inscritos" value="${course.name}">
						    Inscritos
						  </button>
						</p>
						<div class="collapse" id="collapseExample${course.name}">
						  <div class="card card-body">
						     ${myJSON}
						  </div>
						</div>
					</td>
					<td><button class="btn btn-primary" type="submit" name=${switchVal} value="${course.name}">${switchVal}</button></td>
					</tr> `;
	});
	texto += "</tbody> </table><input type='hidden' name='asigna'  value='asigna'></form>";
	return texto;
});

// Ayuda para la visualización de imagenes
hbs.registerHelper('imagerSource', photo => (photo ?
	`data:img/jpeg;base64,${photo.toString('base64')}` :
	'../../assets/images/gallery/product_default.png'));


// Eliminar inscripcion mongo

hbs.registerHelper('cancelIncription', (miscursos) => {
	let texto = `	<form action="/dashboarduser" method="post">
			<table class='table table-striped table-hover'>
					<thead class='thead-dark'>
					<th>Nombre</th>
					<th>Valor</th>
					<th>Intensidad</th>
					<th>Modalidad</th>
					<th></th>
					</thead>
					<tbody>`;
	miscursos.forEach((materia) => {
		texto +=
					`<tr>
					<td> ${materia.name} </td>
					<td> ${materia.value} </td>
					<td> ${materia.intensity}</td>
					<td> ${materia.modality} </td>
					<td><button class="btn btn-danger" name="eliminar" value="${materia.name}">Cancelar</button></td>
					</tr> `;
	});
	texto += '</tbody> </table></form>';
	return texto;
});

// Modificar usuarios y listarlos mongo

hbs.registerHelper('modifyUser', (misusuarios) => {
	let texto = `	<form action="/dashboardadmin" method="post">
			<table class='table table-striped table-hover'>
					<thead class='thead-dark'>
					<th>Nombre</th>
					<th>Apellido</th>
					<th>Cédula</th>
					<th></th>
					</thead>
					<tbody>`;
	misusuarios.forEach((usuario) => {
		texto +=
					`<tr>
					<td> ${usuario.firstname} </td>
					<td> ${usuario.lastname} </td>
					<td> ${usuario.cc}</td>
					<td><button class="btn btn-info" name="modificar" value="${usuario._id}">Modificar</button></td>
					</tr> `;
	});
	texto += '</tbody> </table></form>';
	return texto;
});

// Listar y asignar docentes mongo

hbs.registerHelper('assignTeacher', (teachers) => {
	let texto = `	<form action="/dashboardadmin" method="post" name="myform">
					<select class="form-control" name='profesor' onchange="myform.submit()">
					<option selected="">Elija el profesor</option>`;
	teachers.forEach((teacher) => {
		texto +=
					`<option value="${teacher.cc}">${teacher.firstname}</option>`;
	});
	texto += '</select></form>';
	return texto;
});

// Informacion cursos y estudiantes (profesor) mongo

hbs.registerHelper('infoTeachers', (materias) => {
	let texto = `	<form action="/dashboardadmin" method="post">
			<table class='table table-striped table-hover'>
					<thead class='thead-dark'>
					<th>Nombre</th>
					<th>Valor</th>
					<th>Intensidad</th>
					<th>Modalidad</th>
					<th>Estado</th>
					<th></th>
					</thead>
					<tbody>`;
	materias.forEach((element) => {
		const { cursos } = element;
		cursos.forEach((curso) => {
			console.log(`estudiantes en curso ${curso.name}: ${curso.students}`);
			const students = JSON.stringify(curso.students);
			console.log(students);

			texto +=
						`<tr>
						<td> ${curso.name} </td>
						<td> ${curso.value} </td>
						<td> ${curso.intensity}</td>
						<td> ${curso.modality} </td>
						<td> ${curso.state}</td>
						<td>
							<p>
							  <button class="btn btn-primary" type="submit" data-toggle="collapse" data-target="#collapseExample${curso.name}" aria-expanded="false" aria-controls="collapseExample${curso.name}" name="inscritos" value="${curso.name}">
							    estudiantes
							  </button>
							</p>
							<div class="collapse" id="collapseExample${curso.name}">
							  <div class="card card-body">
							     ${students}
							  </div>
							</div>
						</td>
						</tr> `;
		});
	});
	texto += '</tbody></table></form>';
	return texto;
});
